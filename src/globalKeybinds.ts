import { exit } from "@tauri-apps/api/process";

export const exitApplication = () => {
	if (import.meta.env.DEV) {
		console.log(
			"Exit button pressed, but DEV flag is set, so we won't do that right now",
		);
		return;
	}

	console.log("Exiting application!");

	exit(0);
};
