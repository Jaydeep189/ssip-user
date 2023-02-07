<script>
	import '../app.css';
	import Footer from '../layout/Footer.svelte';
	import Navbar from '../layout/Navbar.svelte';
	import { userStore } from 'sveltefire';
	import { auth } from '../firebase/config';
	const user = userStore(auth);
</script>

<main>
	<Navbar />
	<slot />
	<Footer />
</main>
