import { type FC, useEffect } from "react";
import { Buttons } from "./components/Buttons";
import { keyboardEventHandler } from "./globalKeybinds";

export const App: FC = () => {
	useEffect(() => {
		document.addEventListener("keydown", keyboardEventHandler);

		return () => {
			document.removeEventListener("keydown", keyboardEventHandler);
		};
	});

	return (
		<>
			<Buttons />
		</>
	);
};
