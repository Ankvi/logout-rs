import { invoke } from "@tauri-apps/api";
import { type FC, type ReactNode, useEffect, useState } from "react";
import { CiLock } from "react-icons/ci";
import { GrPowerShutdown } from "react-icons/gr";
import { MdRestartAlt } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";

type ButtonProps = {
	text: string;
	command: string;
	icon: ReactNode;
};

const Button: FC<ButtonProps> = ({ text, icon, command }) => {
	return (
		<>
			<button
				onFocus={() => {
					console.log(`Button ${command} focused!`);
				}}
				onClick={() => {
					console.log(`Button ${command} clicked!`);
					invoke("run_command", { command });
				}}
			>
				<div className="button-icon">{icon}</div>
				<div className="button-text">{text}</div>
			</button>
		</>
	);
};

export const Buttons: FC = () => {
	const iconSize = import.meta.env.ICON_SIZE ?? 60;

	const buttons: ButtonProps[] = [
		{
			text: "Lock",
			icon: <CiLock size={iconSize} />,
			command: "lock",
		},
		{
			text: "Reboot",
			icon: <MdRestartAlt size={iconSize} />,
			command: "reboot",
		},
		{
			text: "Shutdown",
			icon: <GrPowerShutdown size={iconSize} />,
			command: "shutdown",
		},
		{
			text: "Log out",
			icon: <PiSignOut size={iconSize} />,
			command: "log-out",
		},
	];
	const [focusedIndex, setFocusedIndex] = useState(0);

	const navigationHandler = (event: KeyboardEvent) => {
		console.log("Navigation handler for buttons triggered");
		switch (event.key) {
			case "h":
			case "LeftArrow":
				if (focusedIndex > 0) {
					setFocusedIndex(focusedIndex - 1);
				}
				break;

			case "l":
			case "RightArrow":
				if (focusedIndex < buttons.length - 1) {
					setFocusedIndex(focusedIndex + 1);
				}
				break;
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", navigationHandler);

		return () => {
			document.removeEventListener("keydown", navigationHandler);
		};
	});

	return (
		<section id="buttons">
			{buttons.map((props) => (
				<Button key={props.command} {...props} />
			))}
		</section>
	);
};
