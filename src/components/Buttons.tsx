import type { FC } from "react";
import { buttons } from "../modules/buttons";

type Props = {
	focusedIndex: number;
    onButtonClicked: (index: number) => void;
};

export const Buttons: FC<Props> = ({ focusedIndex, onButtonClicked }) => {
	return (
		<section id="buttons">
			{buttons.map(({ text, icon }, index) => (
				<button
					className={index === focusedIndex ? "active" : undefined}
					onClick={() => {
                        onButtonClicked(index);
                    }}
				>
					<div className="button-icon">{icon}</div>
					<div className="button-text">{text}</div>
				</button>
			))}
		</section>
	);
};
