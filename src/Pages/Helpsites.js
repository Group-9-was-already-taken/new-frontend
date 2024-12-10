import React, {useState} from "react";
import Placeholder from "./Placeholder.jpg";
import { useNavigate } from "react-router-dom";

export default function HelpSites() {
    
    const navigate = useNavigate();

    const navTo = (path) => {
        navigate(path);
      };
    
  return (
    <div className="moodlog-history-container">
      <div className="moodlog-history-content">
        <div className="helpsites-content">
          <div className="helpsites-text">
            <h2>Terveyskirjasto</h2>
            <p>
              Terveyskirjasto is a trustworthy website listing information on different mental
              and physical health conditions.
            </p>
          </div>
          <div className="helpsites-link-image">
            <a href="https://www.terveyskirjasto.fi/" target="_blank" rel="noopener noreferrer">
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1CSbkG1sOl9_-c3tgm0mDX2Y9PRgWNTITTQ&s' alt="Helpful Resource" />
            </a>
          </div>
        </div>
        <div className="helpsites-content">
          <div className="helpsites-text">
            <h2>Mieli</h2>
            <p>
              Mieli is a website specializing in mental health and in help for it. From this website you can also find our crisis hotline
            </p>
          </div>
          <div className="helpsites-link-image">
            <a href="https://mieli.fi/" target="_blank" rel="noopener noreferrer">
              <img src='https://mieli.fi/wp-content/uploads/2021/06/MIELI-logo-1-747x300.png' alt="Helpful Resource" />
            </a>
          </div>
        </div>
        <div className="helpsites-content">
          <div className="helpsites-text">
            <h2>Ylioppilaiden Terveydenhoitosäätiö (YTHS)</h2>
            <p>
              YTHS is the official student healthcare center for students all around Finland. From here you can find help specially meant for students
            </p>
          </div>
          <div className="helpsites-link-image">
            <a href="https://www.yths.fi/" target="_blank" rel="noopener noreferrer">
              <img src='https://laureamko.fi/wp-content/uploads/2019/03/N%C3%A4ytt%C3%B6kuva-27-1.png' alt="Helpful Resource" />
            </a>
          </div>
        </div>
        <div className="helpsites-content">
          <div className="helpsites-text">
            <h2 onClick={() => navTo('/')}>Go back to frontpage</h2>
          </div>
        </div>
      </div>
    </div>
  );
}