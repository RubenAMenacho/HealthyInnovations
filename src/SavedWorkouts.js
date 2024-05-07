// SavedWorkouts.js

import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function SavedWorkouts() {
    const [workoutPlan, setWorkoutPlan] = useState(null);
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;  // Ensure that the user is logged in

    useEffect(() => {
        if (user) {
            const userDocRef = doc(db, "users", user.uid);

            const fetchWorkoutPlan = async () => {
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists() && docSnap.data().workoutPlan) {
                    setWorkoutPlan(docSnap.data().workoutPlan);
                } else {
                    console.log("No workout plan found!");
                }
            };

            fetchWorkoutPlan();
        }
    }, [user, db]);

    if (!workoutPlan) {
        return <div>Loading workout plan...</div>;
    }

    return (
        <div>
            <h1>{workoutPlan.planName} Workout Plan</h1>
            <pre>{workoutPlan.details}</pre>
        </div>
    );
}

export default SavedWorkouts;


