import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
    return (
        <svg
            className={cn("text-foreground", className)}
            width="151"
            height="41"
            viewBox="0 0 151 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M11.928 23.36V34.52H6.048V8H11.928V18.8H12.096L20.472 8H26.856L17.496 19.824L27.432 34.52H20.616L14.04 25.136L11.928 27.536V23.36Z" fill="currentColor" />
            <path d="M37.3613 23.144V34.52H31.4813V8H37.3613V18.368H45.4253V8H51.3053V34.52H45.4253V23.144H37.3613Z" fill="currentColor" />
            <path d="M68.5159 34.52H57.0679V8H68.5159V13.376H62.9239V16.832H67.5559V21.824H62.9239V29.144H68.5159V34.52Z" fill="currentColor" />
            <path d="M78.6013 34.52H72.7213V8H78.6013V34.52Z" fill="currentColor" />
            <path d="M89.7028 34.52H80.0548L84.2308 26.552L80.8948 21.08L84.8548 14.12L80.1268 8H89.9908L85.2628 14.744L89.1508 21.08L84.6948 27.2L89.7028 34.52Z" fill="currentColor" />
            <path d="M111.411 34.52H105.531V23.504L100.803 26.336V20.864L105.675 18.224V8H111.411V34.52Z" fill="currentColor" />
            <path d="M130.133 35C136.133 35 140.237 31.072 140.237 25.328V24.56C140.237 19.328 136.901 16.064 131.285 16.064H124.901V35H130.133ZM124.901 8H131.861C139.781 8 146.069 13.088 146.069 24.344V25.544C146.069 33.752 141.125 40 131.933 40H119.021V8H124.901Z" fill="currentColor" />
            <rect x="146.867" y="34.52" width="4.128" height="4.128" fill="currentColor" />
        </svg>
    );
}