import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useUser } from '../UserContext'; // Import the user context

const CourseDetail = () => {
    const { courseId } = useParams();
    const { user } = useUser(); // Get the logged-in user from the context
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log("Course ID : ", courseId);

        const fetchCourse = async () => {
            try {
                const courseDoc = await getDoc(doc(db, 'courses', courseId));
                if (courseDoc.exists()) {
                    setCourse(courseDoc.data());
                } else {
                    setError('Course not found');
                }
            } catch (e) {
                setError('Error fetching course: ' + e.message);
                console.log(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    const courseDateTime = new Date(`${course.courseDate}T${course.courseTime}`);
    const currentDateTime = new Date();

    const renderButton = () => {
        if (user.email === course.createdBy) {
            console.log("User is the creator of the course");
            if (currentDateTime >= courseDateTime) {
                console.log("Current date/time has passed the course date/time");
                return <button>Start Course</button>;
            } else {
                console.log("Current date/time has passed the course date/time");
                return <button disabled={true}>Course wilt start at {course.courseDate}</button>;
            }
        } else {
            console.log("User is not the creator of the course");
            if (currentDateTime >= courseDateTime) {
                console.log("Current date/time has passed the course date/time");
                return <button>Join Course</button>;
            } else {
                console.log("Current date/time has not yet reached the course date/time");
                return <button>Save Course</button>;
            }
        }
    };

    return (
        <div>
            <h1>{course.courseName || 'Course Name Not Available'}</h1>
            {course.thumbnail && <img src={course.thumbnail} alt={course.courseName} />}
            <p><strong>Teacher Name:</strong> {course.teacherName || 'Teacher Name Not Available'}</p>
            <p><strong>Teacher Background:</strong> {course.teacherBackground || 'Teacher Background Not Available'}</p>
            <p><strong>Description:</strong> {course.courseDescription || 'Description Not Available'}</p>
            <p><strong>Date:</strong> {course.courseDate || 'Date Not Available'}</p>
            <p><strong>Time:</strong> {course.courseTime || 'Time Not Available'}</p>
            <div>{renderButton()}</div>
        </div>
    );
};

export default CourseDetail;
