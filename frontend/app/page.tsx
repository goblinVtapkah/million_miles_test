'use client'

import dynamic from 'next/dynamic'

const App = dynamic(() => import('./components/App/App'), {
  ssr: false,
})


const Home = () => {
	return <App />
}

export default Home
