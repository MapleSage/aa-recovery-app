'use client';

const TAGS = [
    { id: 'fear', label: 'Fear' },
    { id: 'pride', label: 'Pride' },
    { id: 'security', label: 'Security' },
    { id: 'self-esteem', label: 'Self-esteem' },
    { id: 'sex-relations', label: 'Sex Relations' },
    { id: 'personal', label: 'Personal Relations' },
];

interface TagSelectorProps {
    selected: string[];
    onChange: (selected: string[]) => void;
}

export default function TagSelector({ selected, onChange }: TagSelectorProps) {
    const toggleTag = (tagId: string) => {
        if (selected.includes(tagId)) {
            onChange(selected.filter(id => id !== tagId));
        } else {
            onChange([...selected, tagId]);
        }
    };

    return (
        <div className="tag-selector">
            {TAGS.map(tag => (
                <button
                    key={tag.id}
                    type="button"
                    className={`tag ${tag.id} ${selected.includes(tag.id) ? 'selected' : ''}`}
                    onClick={() => toggleTag(tag.id)}
                >
                    {tag.label}
                </button>
            ))}
        </div>
    );
}
