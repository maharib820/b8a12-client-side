import { Link } from "react-router-dom";
import MostVoted from "../../Components/MostVoted";
import RecentlyAdded from "../../Components/RecentlyAdded";


const HomePage = () => {
    return (
        <div>
            <header className="relative h-[600px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("https://i.ibb.co/6YNptpV/survey.jpg")' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="text-center z-10 relative">
                    <h1 className="text-4xl font-bold text-white mb-4">Opinion</h1>
                    <p className="text-lg text-white mb-8">Welcome to Opinion - where your opinions matter! Dive into a diverse array of surveys, express your thoughts, and connect with a community that values your voice. Our user-friendly platform makes it easy to explore topics, engage in meaningful discussions, and stay informed about real-time insights. Join us at Opinion, where your unique perspective contributes to a tapestry of diverse opinions.</p>
                    <Link to={"/surveypage"}><button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700">Explore</button></Link>
                </div>
            </header>
            <div className="mt-10">
                <h2 className="font-bold text-3xl mb-5">Featured Surveys</h2>
                <MostVoted></MostVoted>
            </div>
            <div className="mt-10">
                <h2 className="font-bold text-3xl mb-5">Recent Surveys</h2>
                <RecentlyAdded></RecentlyAdded>
            </div>
            <div className="px-2 lg:px-0 mb-8">
                <h2 className="text-2xl font-bold font-lobster mt-10 mb-5">F.A.Q</h2>
                <div className="collapse bg-base-200 mb-4">
                    <input type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-xl font-medium">
                        Can I comment without buying package
                    </div>
                    <div className="collapse-content">
                        <p>No you need to buy package to be pro user</p>
                    </div>
                </div>
                <div className="collapse bg-base-200 mb-4">
                    <input type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-xl font-medium">
                        How many questions I can add in a survey
                    </div>
                    <div className="collapse-content">
                        <p>Currently you can add one question</p>
                    </div>
                </div>
                <div className="collapse bg-base-200">
                    <input type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-xl font-medium">
                        Can I modify survey after creation
                    </div>
                    <div className="collapse-content">
                        <p>Yes, you can</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;