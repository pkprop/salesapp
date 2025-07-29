import { Head } from '@inertiajs/react'
import FrontLayout from '#inertia/layouts/frontLayout';
function Home() {
  return (
    <>
      <Head title="Homepage" />

    <div className='container mx-auto p-4'>
      <h1>Welcome to the PropXpo Homepage</h1>
      <p>This is the homepage of PropXpo, where you can find the latest properties and listings.</p>
    </div>
    </>
  )
}

Home.layout = (page: React.ReactNode) => (
  <FrontLayout title="About Us " children={page} />
);

export default Home;