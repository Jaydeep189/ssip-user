import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import type { PageLoad } from './$types';
type Complaints = {
	problemName: string;
	wardName: string;
	status: string;
	date: string;
};

export const load = (async ({ params }: any) => {
	const ls: Complaints[] = [];
	const complaints = await getDocs(collection(db, 'Complaint-Registration'));
	complaints.forEach((doc: any) => {
		let data = doc.data();
		let date = data.date.toDate();
		data['date'] = date.toLocaleDateString();
		ls.push(data);
	});
	console.log(ls);
	return {
		complaints: ls
	};
}) satisfies PageLoad;
