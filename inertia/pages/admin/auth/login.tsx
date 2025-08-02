import { Head,Link, usePage, useForm  } from '@inertiajs/react'
import useCsrfToken from "#inertia/hooks/useCsrfToken";
import AdminLayout from '#inertia/layouts/adminLayout';
import { Input, Button,Loader } from 'rsuite';
import 'rsuite/Input/styles/index.css';
import 'rsuite/Button/styles/index.css';
import 'rsuite/Loader/styles/index.css';

function Login() {
    const csrfToken = useCsrfToken();
    const { data, setData, errors, post, processing } = useForm({
        email: '',
        password: '',
        remember_me:true as boolean,
        invalid:''
    });
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/admin/login',{
            preserveScroll: true,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            onError: (error) => {
                console.log("Validation Errors:", error);
            },
        });
    }
  return (
    <>
      <Head title="Admin Login" />

    <section className="log-in-section background-image-2 section-b-space">
        <div className="container-fluid-lg w-99">
            <div className="row">
                <div className='col-xxl-12 col-xl-12 col-lg-12'>
                    <div className="log-in-header justify-content-center d-flex m-b-2">
                        <Link href="/admin" className="logo">
                            <img src="/salesapp-logo.png" className="img-fluid" alt="" />
                        </Link>
                    </div>
                </div>
                <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
                    <div className="image-contain">
                        {/* <img src="/images/login_page.jpg" className="img-fluid" alt="" /> */}
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
                    <div className="log-in-box">
                        <div className="log-in-title">
                            <h3>Welcome To SalesApp</h3>
                            <h4>Log In Your Account</h4>
                        </div>
                        <div className="input-box">
                            <form className="row g-4" onSubmit={handleSubmit}>
                                <div className="col-12">
                                    <div className="form-floating theme-form-floating"> 
                                        <Input
                                            name="email"
                                            value={data.email}
                                            onChange={(value) => setData('email', value)}
                                            placeholder="Email Address"
                                            className={'form-control'}
                                            type='email'
                                            required
                                        />
                                        <label>Email Address</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-floating theme-form-floating">
                                        <Input
                                            name="password"
                                            value={data.password}
                                            onChange={(value) => setData('password', value)}
                                            placeholder="Password"
                                            className={'form-control'}
                                            type='password'
                                            required
                                        />
                                        <label>Password</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                {errors.invalid && (
                                    <div className='error-alert'>
                                        {errors.invalid}
                                    </div>
                                    
                                )}
                                </div>
                                <div className="col-12">
                                    <button
                                        type="submit"
                                        className="btn-indigo btn btn-animation w-100"
                                    >
                                        {processing ? <Loader content="Loading..." /> : 'Log In'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

// Login.layout = (page: React.ReactNode) => (
//   <AdminLayout title="Login" children={page} />
// );

export default Login;