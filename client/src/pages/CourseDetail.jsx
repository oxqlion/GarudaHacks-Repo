import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { useUser } from '../UserContext';
import Peer from 'peerjs';

const CourseDetail = () => {
    const { courseId } = useParams();
    const { user } = useUser(); // Get the logged-in user from the context
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [callExists, setCallExists] = useState(false);
    const [peerId, setPeerId] = useState(null);
    const remoteVideoRef = useRef(null);
    const localVideoRef = useRef(null);

    useEffect(() => {
        console.log("Course ID: ", courseId);

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

    useEffect(() => {
        if (user.email !== course?.createdBy && course) {
            const checkCallExists = async () => {
                try {
                    const q = query(collection(db, 'calls'), where('id', '==', courseId));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        setCallExists(true);
                    }
                } catch (error) {
                    console.error("Error checking call existence: ", error);
                }
            };

            checkCallExists();
        }
    }, [user.email, course, courseId]);

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

    const startCall = async () => {
        const callPeerId = Math.floor(100000 + Math.random() * 900000);

        setPeerId(callPeerId);
        // await addDoc(collection(db, 'calls'), { courseId, callPeerId });

        navigate(`/meeting/${courseId}`);

        // const peer = useRef(new Peer(callPeerId)).current

        // peer.on('open', id => {
        //     setRoomId(id)
        // })

        // peer.on('call', call => {
        //     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        //         .then(stream => {
        //             if (localVideoRef.current) {
        //                 localVideoRef.current.srcObject = stream
        //             }
        //             call.answer(stream)

        //             call.on('stream', remoteStream => {
        //                 if (remoteVideoRef.current) {
        //                     remoteVideoRef.current.srcObject = remoteStream
        //                 }
        //             })
        //         })
        //         .catch(err => {
        //             console.log("Something went wrong on Join Room Use Effect : ", err)
        //         })
        // })

    };

    const renderButton = () => {
        if (user.email === course.createdBy) {
            console.log("User is the creator of the course");
            if (currentDateTime >= courseDateTime) {
                console.log("Current date/time has passed the course date/time");
                return <button onClick={startCall}>Start Course</button>;
            } else {
                console.log("Current date/time has not yet reached the course date/time");
                return <button disabled={true}>Course will start at {course.courseDate}</button>;
            }
        } else {
            console.log("User is not the creator of the course");
            if (currentDateTime >= courseDateTime) {
                console.log("Current date/time has passed the course date/time");
                if (callExists) {
                    return <button onClick={() => navigate(`/meeting/${courseId}`)}>Join Course</button>;
                } else {
                    return <button disabled={true}>Course hasn't started yet</button>;
                }
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
