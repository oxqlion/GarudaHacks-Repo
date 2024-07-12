import React, { useEffect, useState } from 'react';
import { useUser } from '../UserContext';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const TeacherDashboard = () => {
    const { user } = useUser();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            if (user && user.email) {
                try {
                    const q = query(collection(db, 'courses'), where('createdBy', '==', user.email));
                    const querySnapshot = await getDocs(q);
                    const coursesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setCourses(coursesData);
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            }
        };

        fetchCourses();
    }, [user]);

    return (
        <div className='flex flex-col items-start justify-start'>
            <Navbar />
            <div className="flex w-full pt-24 px-6">
                <Link to="/create-course" className='bg-button-color flex w-full items-center justify-center h-12 rounded-lg font-semibold'>
                    Create Course
                </Link>
            </div>
            <div className="flex w-full pt-6 px-6">
                <h2 className="text-xl font-semibold">My Courses</h2>
            </div>
            <div className="w-full px-6">
                {courses.length > 0 ? (
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Course ID</th>
                                <th className="py-2 px-4 border-b">Course Name</th>
                                <th className="py-2 px-4 border-b">Course Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course.id}>
                                    <td className="py-2 px-4 border-b">
                                        <Link to={`/course/${course.id}`}>{course.id}</Link>
                                    </td>
                                    <td className="py-2 px-4 border-b">{course.courseName}</td>
                                    <td className="py-2 px-4 border-b">{course.courseDate} {course.courseTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No courses found.</p>
                )}
            </div>
        </div>
    );
};

export default TeacherDashboard;
