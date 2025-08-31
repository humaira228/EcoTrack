 // src/components/Register.js
 import React, { useMemo, useState } from 'react';
 import {
   Box,
   Button,
   Container,
   IconButton,
   Modal,
   Paper,
   TextField,
   Typography,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   InputAdornment,
   Link as MuiLink,
 } from '@mui/material';
 import { Visibility, VisibilityOff } from '@mui/icons-material';
 import { useNavigate } from 'react-router-dom';
 
 const Register = () => {
   const navigate = useNavigate();
 
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [goals, setGoals] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [month, setMonth] = useState('');
   const [day, setDay] = useState('');
   const [year, setYear] = useState('');
   const [openModal, setOpenModal] = useState(false);
   const [modalMessage, setModalMessage] = useState('');
 
   // Generate options for dropdowns
   const years = useMemo(() => {
     const current = new Date().getFullYear();
     const start = 1900;
     return Array.from({ length: current - start + 1 }, (_, i) => current - i);
   }, []);
   const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);
   const months = [
     'January','February','March','April','May','June',
     'July','August','September','October','November','December'
   ];
 
   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
   const phoneRegex = /^[0-9+()\s-]{6,20}$/;
 
   const handleSubmit = (e) => {
     e.preventDefault();
 
     if (!name.trim()) return setAndOpen('Please enter your name.');
     if (!emailRegex.test(email)) return setAndOpen('Please enter a valid email.');
     if (!phoneRegex.test(phone)) return setAndOpen('Please enter a valid phone number.');
     if (!month || !day || !year) return setAndOpen('Please select your full birthdate.');
     if (password.length < 6) return setAndOpen('Password must be at least 6 characters.');
 
     // TODO: connect to backend
     setAndOpen('Account created! (demo) Redirecting to login...');
     setTimeout(() => navigate('/login'), 1000);
   };
 
   const setAndOpen = (msg) => {
     setModalMessage(msg);
     setOpenModal(true);
   };
 
   return (
     <Box sx={{ minHeight: '100vh', bgcolor: '#4CAF50' }}>
       {/* Title */}
       <Box sx={{ py: { xs: 4, md: 5 }, textAlign: 'center' }}>
         <Typography
           variant="h4"
           component="h1"
           sx={{
             color: '#0d1b2a',
             fontFamily: '"Times New Roman", Times, serif',
             fontWeight: 700,
           }}
         >
           Create your EcoTrack account
         </Typography>
       </Box>
 
       <Container maxWidth="sm">
         <Paper
           elevation={6}
           sx={{ p: 3, borderRadius: 3, fontFamily: '"Times New Roman", Times, serif' }}
         >
           <Box
             component="form"
             onSubmit={handleSubmit}
             sx={{ display: 'grid', gap: 2 }}
           >
             <TextField
               label="Full Name"
               value={name}
               onChange={(e) => setName(e.target.value)}
               fullWidth
               required
               inputProps={{ style: { fontFamily: '"Times New Roman", Times, serif' } }}
             />
 
             {/* Birthdate dropdowns */}
             <Box
               sx={{
                 display: 'grid',
                 gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
                 gap: 2,
               }}
             >
               <FormControl fullWidth required>
                 <InputLabel>Month</InputLabel>
                 <Select
                   label="Month"
                   value={month}
                   onChange={(e) => setMonth(e.target.value)}
                 >
                   {months.map((m, idx) => (
                     <MenuItem key={m} value={idx + 1}>
                       {m}
                     </MenuItem>
                   ))}
                 </Select>
               </FormControl>
               <FormControl fullWidth required>
                 <InputLabel>Day</InputLabel>
                 <Select
                   label="Day"
                   value={day}
                   onChange={(e) => setDay(e.target.value)}
                 >
                   {days.map((d) => (
                     <MenuItem key={d} value={d}>
                       {d}
                     </MenuItem>
                   ))}
                 </Select>
               </FormControl>
               <FormControl fullWidth required>
                 <InputLabel>Year</InputLabel>
                 <Select
                   label="Year"
                   value={year}
                   onChange={(e) => setYear(e.target.value)}
                 >
                   {years.map((y) => (
                     <MenuItem key={y} value={y}>
                       {y}
                     </MenuItem>
                   ))}
                 </Select>
               </FormControl>
             </Box>
 
             <TextField
               label="Email"
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               fullWidth
               required
               inputProps={{ style: { fontFamily: '"Times New Roman", Times, serif' } }}
             />
 
             <TextField
               label="Phone"
               type="tel"
               value={phone}
               onChange={(e) => setPhone(e.target.value)}
               fullWidth
               required
               inputProps={{ style: { fontFamily: '"Times New Roman", Times, serif' } }}
             />
 
             <TextField
               label="Your goals or wishes"
               value={goals}
               onChange={(e) => setGoals(e.target.value)}
               fullWidth
               multiline
               minRows={5}
               maxRows={8}
               placeholder="Tell us what you want to achieve with EcoTrack..."
               inputProps={{ style: { fontFamily: '"Times New Roman", Times, serif' } }}
             />
 
             <TextField
               label="Create Password"
               type={showPassword ? 'text' : 'password'}
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               fullWidth
               required
               InputProps={{
                 endAdornment: (
                   <InputAdornment position="end">
                     <IconButton
                       onClick={() => setShowPassword((p) => !p)}
                       edge="end"
                     >
                       {showPassword ? <VisibilityOff /> : <Visibility />}
                     </IconButton>
                   </InputAdornment>
                 ),
               }}
               inputProps={{ style: { fontFamily: '"Times New Roman", Times, serif' } }}
             />
 
             <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }}>
               Create Account
             </Button>
 
             <MuiLink
               href="/login"
               underline="hover"
               sx={{ justifySelf: 'center', mt: 1 }}
             >
               Back to login
             </MuiLink>
           </Box>
         </Paper>
       </Container>
 
       {/* Modal for messages */}
       <Modal open={openModal} onClose={() => setOpenModal(false)}>
         <Box
           sx={{
             position: 'absolute',
             top: '50%',
             left: '50%',
             transform: 'translate(-50%, -50%)',
             bgcolor: 'background.paper',
             p: 4,
             borderRadius: 2,
             boxShadow: 24,
             width: '90%',
             maxWidth: 480,
             fontFamily: '"Times New Roman", Times, serif',
           }}
         >
           <Typography variant="h6" gutterBottom>
             {modalMessage}
           </Typography>
           <Button
             fullWidth
             variant="contained"
             onClick={() => setOpenModal(false)}
           >
             Close
           </Button>
         </Box>
       </Modal>
     </Box>
   );
 };
 
 export default Register;
 