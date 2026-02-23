'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

const DB_PATH = path.join(process.cwd(), 'src/data/projects.json');

export async function getProjects() {
    if (!fs.existsSync(DB_PATH)) return [];
    try {
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    } catch (e) {
        return [];
    }
}

export async function saveProject(formData: FormData) {
    const id = formData.get('id') as string || `project-${Date.now()}`;
    const name = formData.get('name') as string;
    const location = formData.get('location') as string;
    const year = formData.get('year') as string;
    const description = formData.get('description') as string;
    const tags = (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(Boolean);

    let projects = [];
    if (fs.existsSync(DB_PATH)) {
        projects = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    }

    const project = {
        id,
        name,
        location,
        year,
        description,
        tags,
        imagePath: formData.get('imagePath') as string || '/placeholder-project.jpg',
    };

    const idx = projects.findIndex((p: any) => p.id === id);
    if (idx > -1) {
        projects[idx] = project;
    } else {
        projects.push(project);
    }

    fs.writeFileSync(DB_PATH, JSON.stringify(projects, null, 2));
    revalidatePath('/admin/referanslar');
    revalidatePath('/referanslar');
    
    return { success: true };
}
