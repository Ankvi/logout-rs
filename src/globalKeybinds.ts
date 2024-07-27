import { exit, relaunch } from "@tauri-apps/api/process";

const exitApplication = () => {
	if (import.meta.env.DEV) {
		console.log(
			"Exit button pressed, but DEV flag is set, so we won't do that right now",
		);
		return;
	}

	console.log("Exiting application!");

	exit(0);
};

export const keyboardEventHandler = async (event: KeyboardEvent) => {
	if (event.key === "Escape") {
		return exitApplication();
	}

	if (event.key === "r" && event.ctrlKey) {
		if (event.ctrlKey) {
			return await relaunch();
		}
	}

	console.log(event.key);
};
