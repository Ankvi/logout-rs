import { type FC, type ReactNode, useEffect, useState } from "react";
import { CiLock } from "react-icons/ci";
import { GrPowerShutdown } from "react-icons/gr";
import { MdRestartAlt } from "react-icons/md";

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
				}}
			>
				{icon}
				{text}
			</button>
		</>
	);
};

export const Buttons: FC = () => {
	const buttons: ButtonProps[] = [
		{
			text: "Lock",
			icon: <CiLock />,
			command: "lock",
		},
		{
			text: "Lock",
			icon: <CiLock />,
			command: "lock",
		},
		{
			text: "Lock",
			icon: <CiLock />,
			command: "lock",
		},
	];
	const [focusedIndex, setFocusedIndex] = useState(0);

	const navigationHandler = (event: KeyboardEvent) => {
		console.log("Navigation handler for buttons triggered");
	};

	useEffect(() => {
		document.addEventListener("keydown", navigationHandler);

		return () => {
			document.removeEventListener("keydown", navigationHandler);
		};
	});

	useEffect;

	return (
		<>
			<Button text="Lock" icon={<CiLock />} command="lock" />
			<Button text="Reboot" icon={<MdRestartAlt />} command="reboot" />
			<Button text="Shutdown" icon={<GrPowerShutdown />} command="shutdown" />
		</>
	);
};
