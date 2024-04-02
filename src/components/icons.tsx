import { LucideProps } from 'lucide-react';

export const Icons = {
    logo: (props: LucideProps) => (
        <svg {...props} viewBox="0 0 200 200">
            <rect width="100%" height="100%" fill="#FFFFFF" />
            <path fill="#007FFF" d="M50,20 L80,100 L110,20 L140,20 L110,100 L80,20 Z" />
            <path fill="#00FF7F" d="M140,20 L170,100 L200,20 L230,20 L200,100 L170,20 Z" />
        </svg>
    )
}