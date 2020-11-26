import React, { Component } from "react"
import { Formik, Field, Form } from "formik"
import * as Yup from 'yup'

class UserForm extends Component {

  render() {
    return (
      <div className="container">
        <h4>User Registration Form</h4>
        <Formik
          initialValues={{ name: "", email: "", contact: "", gender: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 1000);
          }}
          validationSchema={Yup.object({
            name: Yup.string()
                .required('Name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            contact: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Contact Number is required'),
        })}
        >
          {( formik, isSubmitting ) => (
            <Form>
              <div className="form-group">
                <label htmlFor="name"><strong>Full Name</strong></label>
                <Field name="name" className={(formik.touched.name && formik.errors.name) ? 'form-control is-invalid' : 'form-control'} type="text" placeholder="Please enter your name"/>
                {formik.touched.name && formik.errors.name ? (
                            <div className="invalid-feedback">{formik.errors.name}</div>
                        ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="email"><strong>Email Address</strong></label>
                <Field name="email" className={(formik.touched.email && formik.errors.email) ? 'form-control is-invalid' : 'form-control'} type="email" placeholder="Please enter your email address"/>
                {formik.touched.email && formik.errors.email ? (
                            <div className="invalid-feedback">{formik.errors.email}</div>
                        ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="contact"><strong>Contact</strong></label>
                <Field name="contact" className={(formik.touched.contact && formik.errors.contact) ? 'form-control is-invalid' : 'form-control'} type="number" placeholder="Please enter your mobile number"/>
                {formik.touched.contact && formik.errors.contact ? (
                            <div className="invalid-feedback">{formik.errors.contact}</div>
                        ) : null}
              </div>

              <div className="form-group">
                    <label><strong>Gender</strong></label>
                    <div className="form-check">
                            <Field className="form-check-input" type="radio" name="gender" id="male" value="male" />
                            <label className="form-check-label" htmlFor="male">Male</label>
                    </div>
                    <div className="form-check">
                            <Field className="form-check-input" type="radio" name="gender" id="female" value="female" />
                                <label className="form-check-label" htmlFor="female">Female</label>
                    </div>
            </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Please wait..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default UserForm;
