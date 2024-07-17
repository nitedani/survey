import vikeReact from 'vike-react/config'
import vikeReactQuery from 'vike-react-query/config'


export default {
    title: 'My App',
    extends: [vikeReact, vikeReactQuery],
    passToClient: ["session"],
    //TODO: remove this
    reactStrictMode: true
} 
