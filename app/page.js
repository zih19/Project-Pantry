'use client' // client side
import Image from "next/image";
import { useState, useEffect } from 'react';
import { firestore } from '@/firebase';
import {query, getDocs, collection, doc, getDoc, deleteDoc, setDoc} from 'firebase/firestore';
import {Box, Button, Modal, Stack, TextField, Typography} from '@mui/material'; 

// (1) Box: 
//     - the basic storing block in materialUI 
//       properties: (width, height, display, justifyContent, alignItems, position
//                    top, left, right, bottom, transform, bgColor, border, boxShadow 
//                    padding, display, flexDirection, gap, minHeight)
//
// 

//  (2) Button
//     - a type of functionality that can make updates for your content
//       properties: (variant, onClick)
                                                         
// (2) Modal
//     - keep adding stuff
//       properties: (open, onClose)  

// (3) Stack
//     - Boxes that are ordered everything
//       properties: (width, direction, spacing)

// (4) TextField
//      - another a box that can type words and phrases
//        properties: (variant, fullWidth, value, onChange)
//

// (5) Typography
//     - words or phrase that can be typed
//       properties: (variant, color, textAlign)     



export default function Home() {
  const [inventory, setInventory] = useState([]); // the machine itself
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  // import the list above
  // async is a keyword to prevent the code being blocked while fetching data
  const updateInventory = async() => {
    const snapshot = query(collection(firestore, 'inventory')); 
    const docs = await getDocs(snapshot);
    const inventoryList = []
    docs.forEach((doc) => {
         inventoryList.push({
           name: doc.id,
           ...doc.data()
         })
    })
    setInventory(inventoryList);
  }
  
  // useEffect(): runs the code to see whether my modification takes effect
  useEffect(() => {
     updateInventory()
  }, []) // []: return once
  
  // add an item to the database
  const addItem = async(item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    }
    else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  }

  // remove an item from the firebase
  const removeItem = async(item) => {
     const docRef = doc(collection(firestore, 'inventory'), item);
     const docSnap = await getDoc(docRef);

     if (docSnap.exists()) {
        const {quantity} = docSnap.data();
        if (quantity === 1) {
          await deleteDoc(docRef);
        }
        else {
          await setDoc(docRef, {quantity: quantity - 1});
        }
     }
     await updateInventory();
  }

  // simulate the open functionality
  const handleOpen = () => setOpen(true);
  
  // simulate the close functionality
  const handleClose = () => setOpen(false);
  
return (
    <Box width="100vw"
         height="100vh"
         display="flex"
         flexDirection="column"
         justifyContent="center"
         alignItems="center"
         gap={2}>

        {/* Open a Modal Once the button is clicked */}
        <Modal open={open}
              onClose={handleClose}>
          <Box position="absolute"
               top="50%"
               left="50%"
               transform="translate(-50% -50%)"
               width={400}
               bgcolor="white"
               border="2px solid #000"
               boxShadow={24}
               p={4}
               display="flex"
               flexDirection="column"
               gap={3}>
              <Typography variant="h6">Add Item</Typography>
              <Stack width="100%"
                     direction="row"
                     spacing={2}>
                 <TextField variant="outlined"
                            fullWidth
                            value={itemName}
                            onChange={(e) => {
                              setItemName(e.target.value)
                            }} 
                 />
                 <Button variant="outlined" onClick={() => {
                     addItem(itemName) // connect with the database in order to see the most recent info
                     setItemName('')
                     handleClose()
                 }}>
                     Clicked
                 </Button>
              </Stack>
          </Box>
       </Modal>
       
       {/* Create a box to store all items it currently has */}
       <Box border='1px solid #333'>
          <Box width="800px"
               height="100px"
               bgcolor="ADD8E6"
               display="flex"
               alignItems="center"
               justifyContent="center">
                <Typography variant="h2" color="#333"> Inventory Items </Typography>
          </Box>
      
        
          {/* my currenty stack */}
          <Stack width="800px"
                height="300px"
                spacing={2}
                overflow="auto"> {/* hide the extra item by doing overflow */}
          {
            inventory.map(({name, quantity}) => (
              <Box key={name}
                    width="100%"
                    minHeight="150px"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    bgcolor="#f0f0f0"
                    paddingX={5}>
                  <Typography variant="h3" color="#333" textAlign="center">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                  <Typography variant="h3" color="#333" textAlign="center">
                    Quantity: {quantity}
                  </Typography>
                  <Button variant="contained" onClick={() => removeItem(name)}>Remove</Button>
              </Box>
            ))
          }  
          </Stack>
        </Box>
       <Button variant="contained" onClick={() => handleOpen()}> Add New Item  </Button>
      </Box>
  );
}
