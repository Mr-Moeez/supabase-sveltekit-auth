import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"

export const actions = {
    reset_password: async ({ request, locals }) => {
        const formData = await request.formData()
        console.log(formData, "formdata")
        const email = formData.get('email')
        debugger
        const { data, error: err } = await locals.supabase.auth.resetPasswordForEmail(
            email, 
            {redirectTo: '/update_password'}
        )

        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return fail(400, {
                    error: "invalidCredentials", email: email, invalid: true, message: err.message
                })
            }
            return fail(500, {
                error: "Server error. Please try again later.",
            })
        }

        redirect(303, "/check_email");
    },
}

export async function load({locals: { getSession } }) {
    const session = await getSession();
    // if the user is already logged in return him to the home page
    if (session) {
        redirect(303, '/');
    }
  }