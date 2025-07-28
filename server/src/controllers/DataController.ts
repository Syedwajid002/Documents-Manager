import { Request, Response } from 'express';
import { getDb } from '../config/dbconfig';

interface File {
    id: number;
    thumbnail: string;
    size: string;
}

export const Addphotos = async (req: Request, res: Response) => {
    try {
        const { id, thumbnail, size } = req.body;

        if (!id || !thumbnail || !size) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const db = getDb();
        const PhotosCollection = db.collection('filesData');

        const result = await PhotosCollection.insertOne({ id, thumbnail, size });

        if (result.acknowledged) {
            return res.status(201).json({ message: 'Photo added successfully', data: { id, thumbnail, size } });
        } else {
            return res.status(500).json({ message: 'Failed to add photo' });
        }
    } catch (error) {
        console.error('Error adding photo:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getphotos = async (req: Request, res: Response) => {
    try {
        const db = getDb();
        const PhotosCollection = db.collection("filesData");

        const data = await PhotosCollection.find().toArray();

        console.log(data);
        res.status(200).send({
            message: "Got Data",
            data: data
        });
    } catch (err: any) {
        console.error("Getting Photos Failed:", err);
        res.status(500).send({
            message: "Failed to get photos due to server error."
        });
    }
};

export const getFolders = async (req: Request, res: Response) => {
    try {
        const db = getDb();
        const FolderCollection = db.collection("foldersData");

        const data = await FolderCollection.find().toArray();

        console.log(data);
        res.status(200).send({
            message: "Got Folder Data",
            data: data
        });
    } catch (err: any) {
        console.error("Getting Folder Failed:", err);
        res.status(500).send({
            message: "Failed to get Folder due to server error."
        });
    }
};
