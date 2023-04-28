import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount} from "wagmi";
import { ncontract } from "./App";
import { useState } from "react";
import './mint.css';

const Mint = () => {
  const { address } = useAccount();
  const [flag, setFlag] = useState(false);
  const [Image, setImage] = useState();
  const [nftImages, setnftImages] = useState([]);
  // console.log("addressssssssss",address)
  // const ncontract = props.state;

  
  const handlesetUri=async()=>
  {
    const uriInput=document.getElementById('seturiId').value;
    try
    {
      const setURIFunc=await ncontract.setBaseTokenURI(uriInput);
      await setURIFunc.wait();
      console.log('BaseUri Setted');
      alert("BaseUri Setted");
    }
    catch
    {
      console.log("Can't set Base URI");
      alert("Can't set Base URI");
    }
  }

  const handleShow=async()=>
  {
      const showUri=await ncontract.baseTokenURI();
      if(showUri!="")
      {
        // setURI(showUri);
        console.log("BaseUri",showUri);
        document.getElementById('uriid').innerHTML=showUri;
        alert("BaseUri= "+showUri);
      }
      else
      {
        alert("base URI is not setted");
      }
      
  }

  const handleMint=async()=>
  {
    
    const add=document.getElementById('addr').value;
    try
    {
      const mintfunc=await ncontract.mintTo(add);
      const e=await mintfunc.wait();
      console.log('Minted ');
      // console.log("token id",e.events[0].args.tokenId);
      const tokenId=Number(e.events[0].args.tokenId);
      console.log("tokemnnnnnnn",tokenId);
      alert("Token Minted\nToken Id: "+tokenId)
    }
    catch
    {
      console.log('gtj');
    }
  }
  // const handleShowNFT=async()=>
  // {
  //   setFlag(false);
  //   const TokenId=document.getElementById('tid').value;
    

  //   if(TokenId!="")
  //   {
      
  //     const showUri=await ncontract.baseTokenURI();
  //     if(showUri!="")
  //     {
  //       const balance=await ncontract.balanceOf(address);
  //       console.log("balanc of owner",Number(balance));
        
  //       console.log("metdataaaa",showUri);
  //       for(let i=0;i<balance;i++)
  //       {
  //         const TokensOfOwner=await ncontract.tokenOfOwnerByIndex(address,i);
  //         const TooInNumber=Number(TokensOfOwner);
  //         if(TooInNumber==TokenId)
  //         {
  //           setFlag(true);
  //           const MetadataTid=showUri+TokenId;
  //           const FetchData=await fetch(MetadataTid);
  //           const FetchJsonData=await FetchData.json();
  //           const ImageURL=FetchJsonData.image;
  //           console.log("Json Data",FetchJsonData);
  //           console.log("Image URL",ImageURL);
  //           setImage(ImageURL);
  //           document.getElementById('ImageId').classList.add('ImageDIV');
  //         }
  //       }
  //       if(flag)
  //       {
          
  //       }
  //       else
  //       {
  //         console.log("Token Id is not exists");
  //         alert("Token Id is not exists")
  //         setImage();
  //         document.getElementById('ImageId').classList.remove('ImageDIV');
  //       }
    
  //     }
  //     else
  //     {
  //       alert('Set Metadata URI to Show NFT ');
  //     }
  //   }
  //   else
  //   {
  //     alert('Enter Token Id')
  //   }
  // }
 
  
  const handleShowNFT=async()=>
  {
      
    const showUri=await ncontract.baseTokenURI();
    if(showUri!="")
    {
      const balance=await ncontract.balanceOf(address);
      console.log("balanc of owner",Number(balance));
      
      console.log("metdataaaa",showUri);
      for(let i=0;i<balance;i++)
      {
        const TokensOfOwner=await ncontract.tokenOfOwnerByIndex(address,i);
        const TooInNumber=Number(TokensOfOwner);
        const MetadataTid=showUri+TooInNumber;
        const FetchData=await fetch(MetadataTid);
        const FetchJsonData=await FetchData.json();
        const ImageURL=FetchJsonData.image;
        // console.log("Json Data",FetchJsonData);
        console.log("Image URL",ImageURL);
        // setnftImages([...nftImages,ImageURL]);
        setnftImages(nftImages=>[...nftImages,ImageURL]);
        nftImages.push(ImageURL);
        

      }
      console.log("images dataaaaaa",nftImages);
    }
    else
    {
      alert('Set Metadata URI to Show NFT ');
    }
}


  return (
    <>
     

      <div class="accordion" id="accordionExample">
     
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              CONNECT WALLET
            </button>
          </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <div class="card">
                  <div class="card-body">
                    {/* <div style={{display:'flex',justifyContent:'center',marginBlock:'20px'}}>
                  <ConnectButton />
                  </div> */}
                  <div style={{display:'flex',justifyContent:'center',marginBlock:'20px'}}>
                  <ConnectButton />
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              SET BASETOKENURI
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
            <div class="card" >
              <div class="card-body">
              <input type="text" id="seturiId" placeholder='Enter URL' /><br />
              <button  className='btn btn-primary' onClick={handlesetUri} >set</button>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              SHOW TOKEN URI
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <div class="card" >
                <div class="card-body">
                  <div id="uriid"></div>
                <button className='btn btn-primary my-3' onClick={handleShow} >Show baseUri</button>
                </div>
              </div>     
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingFour">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              MINT NFT
            </button>
          </h2>
          <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <div class="card" >
                <div class="card-body">
                  <input type="text" id='addr' placeholder='Enter Address' value={address}/><br />
                  <button className='btn btn-primary' onClick={handleMint}>Mint</button>
                </div>
              </div>     
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingFive">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
             SHOW NFT
            </button>
          </h2>
          <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <div class="card" >
                <div class="card-body">
                  {/* <input type="number" id='tid' placeholder='Enter Token ID' /><br /> */}
                  <button className='btn btn-primary' onClick={handleShowNFT}>SHOW</button>
                  {/* <div>
                    <img id="ImageId" src={Image} alt="" />
                  </div> */}
                </div>
              </div>     
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Mint