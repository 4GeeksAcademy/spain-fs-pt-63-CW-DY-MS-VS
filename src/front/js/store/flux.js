const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			email: "",
			password: "",
			userType: "client",
			client: null,
			artist: null
		},
		actions: {
			handleChange: (e) => {
				const { name, value } = e.target;
				setStore((prevStore) => ({
				  ...prevStore,
				  [name]: value
				}));
			  },
		
			  login: async () => {
				const store = getStore();
				const user = {
				  email: store.email,
				  password: store.password,
				  userType: store.userType
				};
		
				try {
				  const resp = await fetch("https://fantastic-memory-7vvqgpvwj79p3wr5r-3001.app.github.dev/api/login_artist", {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json'
					},
					body: JSON.stringify(user)
				  });
		
				  if (resp.ok) {
					const data = await resp.json();
					if (store.userType === "client") {
					  setStore({ ...store, client: data });
					} else {
					  setStore({ ...store, artist: data });
					}
				  } else {
					console.log("Error en la solicitud:", resp.statusText);
				  }
				} catch (error) {
				  console.log("Error en la solicitud:", error);
				}
			  },
		
			registerUserClient: async (userClient) => {
				try {
					// fetching data from the backend
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/user_client", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						}, body: JSON.stringify(userClient)
					})
					const client = await resp.json()
					setStore({ ...store, client })
					// don't forget to return something, that is how the async resolves
					return client;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			registerUserArtist: async (userArtist) => {
				try {
					// fetching data from the backend
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/user_artist", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						}, body: JSON.stringify(userArtist)
					})
					const artist = await resp.json()
					setStore({ ...store, artist })
					// don't forget to return something, that is how the async resolves
					return artist;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},



		}
	};
};

export default getState;
