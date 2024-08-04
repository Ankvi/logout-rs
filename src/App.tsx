import { invoke } from "@tauri-apps/api";
import { relaunch } from "@tauri-apps/api/process";
import { type FC, useCallback, useEffect, useState } from "react";
import { Buttons } from "./components/Buttons";
import { exitApplication } from "./globalKeybinds";
import { buttons } from "./modules/buttons";

export const App: FC = () => {
	const [currentButtonIndex, setCurrentButtonIndex] = useState(0);

	const onButtonClicked = useCallback(async (index: number) => {
		const button = buttons[index];
		if (!button) {
			console.log("No button selected");
			return;
		}
		console.log(`Button '${button.text}' clicked!`);
		return await invoke("run_operation", buttons[currentButtonIndex]?.command);
	}, []);

	useEffect(() => {
		const keyboardEventHandler = async (event: KeyboardEvent) => {
			if (event.key === "r" && event.ctrlKey) {
				if (event.ctrlKey) {
					return await relaunch();
				}
			}

			switch (event.key) {
				case "Escape":
					return exitApplication();

				case "Enter":
					return await onButtonClicked(currentButtonIndex);

				case "h":
				case "ArrowLeft":
					if (currentButtonIndex > 0) {
						setCurrentButtonIndex(currentButtonIndex - 1);
					}
					break;

				case "l":
				case "ArrowRight":
					if (currentButtonIndex < buttons.length - 1) {
						setCurrentButtonIndex(currentButtonIndex + 1);
					}
					break;
			}
			console.log(event.key);
		};

		document.addEventListener("keydown", keyboardEventHandler);

		return () => {
			document.removeEventListener("keydown", keyboardEventHandler);
		};
	});

	return (
		<>
			<Buttons
				focusedIndex={currentButtonIndex}
				onButtonClicked={onButtonClicked}
			/>
		</>
	);
};
