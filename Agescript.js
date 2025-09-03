function calculateAge() {

    const dobInput = document.getElementById("dobInput").value;
    if (!dobInput) {
        document.getElementById("result").textContent = "Please enter your date of birth.";
        return;
    }

    const dob = new Date(dobInput);
    const today = new Date();
    
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    const dayDifference = today.getDate() - dob.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }


    document.getElementById("result").textContent = `You are ${age} years old.`;
}