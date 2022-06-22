import React from 'react';
import './App.scss';

function App() {

  const initialValues = {
    username: '',
    email: '',
    password: '',
  }

  const [formValues, setFormValues] = React.useState(initialValues)
  const [formErrors, setFormErrors] = React.useState({})
  const [isSubmit,setIsSubmit] = React.useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
    console.log(formValues)
  }
  
  const submit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }

  React.useEffect(() => {
    console.log(formErrors)
    if (Object.keys(initialValues).length === 0 && isSubmit) {
      console.log(formValues)
    }
  },[formErrors])

  const validate = (values) => {
    const errors = {

    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!values.username) {
      errors.username = 'Username is required'
    }
    if (!values.email) {
      errors.email = 'Email is required'
    }
    else if (!emailRegex.test(values.email)) {
      errors.email = 'Npt valid email format'
    }
    if (!values.password) {
      errors.password = 'Password is required'
    }
    else if (values.password.length < 4) {
      errors.password = 'Password must be at least 4 characters'
    }
    else if (values.password.length > 10) {
      errors.password = 'Password must be shorter than 10 characters'
    }
    return errors
  }

  return (
    <div className="wrapper">

      {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className='signed'>Signed in succesfully</div>) : (
          <pre>{ JSON.stringify(formValues,undefined, 2) }</pre>
        ) }

      
      <form onSubmit={submit}>
        <h1>React Log In</h1>
        <div className="divider"></div>
        <div className="form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Type your Username here"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{ formErrors.username }</p>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Type your Email here"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{ formErrors.email }</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Type your Password here"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{ formErrors.password }</p>
          <button className="submitBtn">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
