import App from 'SvelteEntry';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;