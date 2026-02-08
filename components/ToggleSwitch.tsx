'use client';

interface ToggleSwitchProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function ToggleSwitch({ label, checked, onChange }: ToggleSwitchProps) {
    return (
        <div className="toggle-group">
            <span className="toggle-label">{label}</span>
            <button
                type="button"
                className={`toggle-switch ${checked ? 'active' : ''}`}
                onClick={() => onChange(!checked)}
                role="switch"
                aria-checked={checked}
            />
        </div>
    );
}
