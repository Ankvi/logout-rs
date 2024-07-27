import { exit } from "@tauri-apps/api/process";
import { type FC, useEffect, useState } from "react";
import { Buttons } from "./components/Buttons";

const exitApplication = () => {
    if (import.meta.env.DEV) {
        console.log("Exit button pressed, but DEV flag is set, so we won't do that right now");
        return;
    }

    console.log("Exiting application!");

    exit(0);
}

export const App: FC = () => {
    const handler = (event: KeyboardEvent) => {
        switch (event.key) {
            case "Escape": {
                return exitApplication();
            }

            default: {
                console.log(event.key);
            }
        }
    };

	useEffect(() => {
		document.addEventListener("keydown", handler);

		return () => {
			document.removeEventListener("keydown", handler);
		};
	});

	return (
		<>
			<Buttons />
		</>
	);
};
