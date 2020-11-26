/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { add, update, delet } from "../../actions";
import axios from "axios";

function User() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [mode, setMode] = useState("add");
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const fetchData = async () => {
    await axios("http://localhost:3001/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(async () => {
    console.log(userData);
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <div className="container">
        <h4>User Registration Form</h4>
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: selectedUser.name ? selectedUser.name : "",
            email: selectedUser.email ? selectedUser.email : "",
            contact: selectedUser.contact ? selectedUser.contact : "",
            gender: selectedUser.gender ? selectedUser.gender : "",
          }}
          onSubmit={(values, { resetForm }) => {
            setSubmitting(true);
            if (mode === "add") {
              dispatch(add(values));
            } else {
              dispatch(update(selectedUser["_id"], values));
            }
            setTimeout(() => {
              setSubmitting(false);
              resetForm();
              setMode("add");
              setSelectedUser({});
              fetchData();
            }, 1000);
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            contact: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Contact Number is required"),
          })}
          render={(formik) => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">
                  <strong>Full Name</strong>
                </label>
                <Field
                  name="name"
                  className={
                    formik.touched.name && formik.errors.name
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="text"
                  placeholder="Please enter your name"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <strong>Email Address</strong>
                </label>
                <Field
                  name="email"
                  className={
                    formik.touched.email && formik.errors.email
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="email"
                  placeholder="Please enter your email address"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="contact">
                  <strong>Contact</strong>
                </label>
                <Field
                  name="contact"
                  className={
                    formik.touched.contact && formik.errors.contact
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="number"
                  placeholder="Please enter your mobile number"
                />
                {formik.touched.contact && formik.errors.contact ? (
                  <div className="invalid-feedback">
                    {formik.errors.contact}
                  </div>
                ) : null}
              </div>

              <div className="form-group">
                <label>
                  <strong>Gender</strong>
                </label>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>

              <div className="form-group">
                {mode === "add" ? (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Add"}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Update"}
                  </button>
                )}
              </div>
            </Form>
          )}
        ></Formik>
      </div>
      <div className="container">
        <h4>User List</h4>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact</th>
                <th scope="col">Gender</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((elem, index) => {
                return (
                  <tr key={elem._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{elem.name}</td>
                    <td>{elem.email}</td>
                    <td>{elem.contact}</td>
                    <td>{elem.gender}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => {
                          setSelectedUser(elem);
                          setMode("edit");
                        }}
                      >
                        Edit
                      </button>{" "}
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-toggle="modal"
                        data-target="#deleteModal"
                        onClick={() => setUser(elem)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="modal fade"
        id="deleteModal"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Are you sure, you want to delete?
              </h5>
            </div>
            <div className="modal-footer" style={{ justifyContent: "center" }}>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  dispatch(delet(user["_id"]));
                  setTimeout(() => {
                    fetchData();
                  }, 500);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default User;
