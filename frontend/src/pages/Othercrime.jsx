import React, { useRef } from 'react'
import './CSS/Othercrime.css'
import facebook from '../Components/Assets/facebook-app-symbol.png'
import instagram from '../Components/Assets/instagram.png'
import Twitter from '../Components/Assets/twitter.png'
import youtube from '../Components/Assets/youtube.png'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser';
export const Othercrime = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_wfu8nlx', 'template_qodnj1h', form.current, {
                publicKey: '_--2gSDlbkLOR-NBL',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    alert('Sucessfully Submited')
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <div className='othercrime'>
            <div className='otherCrime'>
                <h1>Other Crime </h1>
                <p>"You Can Have A Conversation With Us On Email About Other Crime Which Are Not Listed in Our Website So We can</p>
                <p>Give You More Sutitable Solutions In Which Scenario Are You ."</p>
                <div className='Email'>
                    <form ref={form} onSubmit={sendEmail}>
                        <label>Name</label>
                        <input type="text" name="user_name" placeholder='Username' />
                        <label>Email</label>
                        <input type="email" name="user_email" placeholder='Email Address' />
                        <label>Message</label>
                        <textarea name="message" placeholder='Ask Questions' />
                        <button type="submit" value="Send">Submit</button>
                    </form>
                </div>
            </div>
            <div className="footer">
                <ul className="footer-links">
                    <Link style={{ textDecoration: 'none' }} to='/Disclaimer'><li>Disclaimer</li></Link>
                    <Link style={{ textDecoration: 'none' }} to='/FAQ'><li>FAQ</li></Link>
                    <Link style={{ textDecoration: 'none' }} to='/Website Policies'><li>Website Policies</li></Link>
                </ul>
                <div className="footer-social-icon">
                    <div className="footer-icons-container">
                        <a href='https://www.facebook.com/profile.php?id=61557782943831'><img src={facebook} alt="" /></a>
                    </div>
                    <div className="footer-icons-container">
                        <a href='https://www.instagram.com/cyber_crime_solutions/?hl=en'><img src={instagram} alt="" /></a>
                    </div>
                    <div className="footer-icons-container">
                        <a href='https://twitter.com/Cyberdost215403'><img src={Twitter} alt="" /></a>
                    </div>
                    <div className="footer-icons-container">
                        <a href='https://www.youtube.com/channel/UCJu2wA_pKFOJ6j10YW7q7oA'><img src={youtube} alt="" /></a>
                    </div>
                </div>
                <div className="footer-copyright">
                    <hr />
                    <p>Copyright @ 2023 - All Right Reserved Designed By Cyber Crime Solutions.</p>
                </div>
            </div>
        </div>
    )
}
