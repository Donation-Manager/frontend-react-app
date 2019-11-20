import React, { useState, createContext } from 'react';
import Header from './components/header/Header';
import Home from './components/pages/Home/Home';
import Donations from './components/pages/Donations/Donations';
import DonationIntentionForm from './components/pages/DonationIntentions/DonationIntentionsForm';
import DonationIntentions from './components/pages/DonationIntentions/DonationIntentions';
import DonationNeeds from './components/pages/DonationNeeds/DonationNeeds';
import DonationNeedForm from './components/pages/DonationNeeds/DonationNeedForm';
import DonationDetail from './components/donationDetail/DonationDetail';
import DonationNeedsList from './components/donationNeedsList/DonationNeedsList';
import { BrowserRouter, Route } from 'react-router-dom';

export interface Props {
  pageTitle: string
}

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route exact path="/" title="Teste" component={Home}/>
        <Route path="/donations" component={Donations} />
        <Route path="/donationIntentionCreation" component={DonationIntentionForm as any} />
        <Route path="/donationIntentions" component={DonationIntentions} />
        <Route path="/donationNeedCreation" component={DonationNeedForm as any} />
        <Route path="/donationNeedEdition/:id" component={DonationNeedForm as any} />
        <Route path="/donationIntentions/donation{id}" component={DonationDetail} />
        <Route path="/donationsNeeds" component={DonationNeedsList as any} />
      </div>
    </BrowserRouter>
  );
}

export default App;
