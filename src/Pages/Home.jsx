import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import Banner from '../Components/Banner';
import WhyChoose from '../Components/WhyChoose';
import RecentListing from '../Components/RecentListing';
import ExtraSection from '../Components/ExtraSection';
import BookingTrends from '../Components/BookingTrends';
import AOS from "aos";
import "aos/dist/aos.css";
import SpecialOffer from '../Components/SpecialOffer';
import Example from '../Components/Example';
const Home = () => {
    const {user} = useContext(AuthContext)
    console.log(user);
    useEffect(() => {
        AOS.init({
          duration: 2000, 
        });
      }, []);
    return (
        <div>
            <Banner></Banner>
            <WhyChoose></WhyChoose>
            <div className="overflow-hidden">
            <RecentListing></RecentListing>
            </div>
            <div className="container border-b-4 uppercase mx-auto text-center  text-3xl my-8 font-extrabold">
            Drive Safe, Stay Wise
            </div>
            <ExtraSection></ExtraSection>
            <Example></Example>
            <SpecialOffer></SpecialOffer>
            <BookingTrends></BookingTrends>
        </div>
    );
};

export default Home;