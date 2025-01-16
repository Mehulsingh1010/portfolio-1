import { json } from '@remix-run/cloudflare';

export async function action({ request }) {
  // Extract the theme from the form data
  const formData = await request.formData();
  const theme = formData.get('theme');

  // Return the response as a success without session or cookies
  return json({ status: 'success', theme });
}
