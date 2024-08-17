import { redirect } from '@sveltejs/kit';

export const actions = {
    logout: async ({ locals }) => {
        await locals.supabase.auth.signOut()    
        redirect(303, '/');
    }
}
export async function load() {
        redirect(303, '/');
}