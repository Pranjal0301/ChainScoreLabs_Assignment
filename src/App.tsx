
import React, { useEffect, useState } from 'react';
import './App.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage  } from 'wagmi';
import { generateChallenge, authenticate, getPublications } from './utils';
import { Publications } from '@lens-protocol/widgets-react'
import {
  Profile
} from '@lens-protocol/widgets-react'
// import { useExploreProfiles } from '@lens-protocol/react-web'

const App: React.FC = () => {
  const account = useAccount()
  const connected = !!account?.address;
  const address = account?.address;
  const { signMessageAsync } = useSignMessage();
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');

  // const{data, error, loading} = useExploreProfiles()
  // console.log('data: ',data)
  
  console.log(connected)
  console.log(address)
  console.log(account)

  //handel userSearch input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  //console log userSearch just in case
  const handleSubmit = () => {
    // Use searchText state value here or perform any action with it

    console.log( searchText);
  };

  //wallet auth using wagmi hook
  const signIn = async () => {
    try {
      if (!connected) {
        return alert('Please connect your wallet first');
      }
      const challenge = await generateChallenge(address);
      const signature = await signMessageAsync({ message: challenge });
      const accessToken = await authenticate(address, signature);
      console.log({ accessToken });
      window.sessionStorage.setItem('accessToken', accessToken);

      console.log({signature})
      console.log({ challenge });
    } catch (error) { 
      console.error(error);
      alert('Error signing in');
    }
  };
// only display wallet address after login
   useEffect(() => {
    getPublications().then(setPosts);
  }, []);
  console.log(posts.map((post)=>{post}))
  return (
    <>
      {/* <Navbar>Wallet Address: {walletAddress}</navbar> */}
      
      <div className='content'>
      <ConnectButton />
      <button className='loginbtn' onClick={signIn} >Lens Login</button>
      {connected && <div className="wrap">
         <div className="search">
          <input type="text" className="searchTerm" placeholder="Search User" value={searchText} onChange={handleInputChange} />
          <button type="submit" className="searchButton" onClick={handleSubmit}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search"><g data-name="Layer 2"><path d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" data-name="search"></path></g></svg>
          </button>
         </div>
      </div>}

      <br /> 
      <br />
      
      {connected && <Profile handle={`lens/${searchText}`} />}

      {connected && <h2>-----User Feed-----</h2>}

      {/* tempeorary fix renders publications for search */}
      {connected && <Publications handle={`lens/${searchText}`} />}

      
      
      </div>
    </>
  );
};

export default App;
