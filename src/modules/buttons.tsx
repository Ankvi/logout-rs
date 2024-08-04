import { ReactNode } from "react";
import { CiLock } from "react-icons/ci";
import { GrInspect, GrPowerShutdown } from "react-icons/gr";
import { MdRestartAlt } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";

type Operation = {
	exec: string;
	args?: string[];
};

export type ButtonConfig = {
	text: string;
	command: Operation;
	icon: ReactNode;
};

const iconSize = import.meta.env.ICON_SIZE ?? 60;

export const buttons: ButtonConfig[] = [
	{
		text: "Test",
		icon: <GrInspect size={iconSize} />,
		command: {
			exec: "notify-send",
			args: ["kek"],
		},
	},
	{
		text: "Lock",
		icon: <CiLock size={iconSize} />,
		command: {
			exec: "swaylock",
		},
	},
	{
		text: "Reboot",
		icon: <MdRestartAlt size={iconSize} />,
		command: {
			exec: "systemctl",
			args: ["reboot"],
		},
	},
	{
		text: "Shutdown",
		icon: <GrPowerShutdown size={iconSize} />,
		command: {
			exec: "systemctl",
			args: ["poweroff"],
		},
	},
	{
		text: "Log out",
		icon: <PiSignOut size={iconSize} />,
		command: {
			exec: "loginctl",
			args: ["terminate-user", "$USER"],
		},
	},
];
