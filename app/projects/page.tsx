import { Suspense } from 'react';
import ProjectsContent from './ProjectsContent';

export default function ProjectsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading projects...</div>}>
            <ProjectsContent />
        </Suspense>
    );
}
