import LoginForm from './ui/user/LoginForm'
import RegisterForm from './ui/user/RegisterForm'
import FrontPage from './ui/FrontPage'
import Page2 from './ui/Page2'
import GreetingsPage from './ui/greetings/GreetingsPage'

export default {
  login: {
    route: {
      path: "/login",
      component: LoginForm,
    },
    link: {
      text: "Login",
      to: "/login",
    }
  },
  register: {
    route: {
      path: "/register",
      component: RegisterForm,
    },
    link: {
      text: "Register",
      to: "/register",
    }
  },
  greetings: {
    route: {
      path: "/greetings",
      component: GreetingsPage,
    },
    link: {
      text: "Greetings",
      to: "/greetings",
    }
  },
  page2: {
    route: {
      path: "/page2",
      component: Page2,
    },
    link: {
      text: "Page2",
      to: "/page2",
    }
  },
  home: {
    route: {
      path: "/",
      component: FrontPage,
      exact: true
    },
    link: {
      text: "Home",
      to: "/",
    }
  }
}
