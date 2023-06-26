import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as contractApi from '../services/contract';

export default function ListItem(props) {
  console.log(props.pageState);
  const id = props.id;
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');
  const type = localStorage.getItem('type');

  async function handleSettle() {
    await contractApi.init();
    const address = props.settlementAddr;
    // console.log(`props: ${JSON.stringify(props)}`);
    console.log(`SellerContract address: ${address}`);
    contractApi.settlementContract.load(address);
    const result = await contractApi.settlementContract.settle();
    const txLog = await contractApi.settlementContract.event.getSettleLog(result);
    console.log(`settle() Transaction: ${result.transactionHash}`);
    window.alert(`정산이 완료되었습니다.\ntxid: ${result.transactionHash}\n정산금액:${txLog.amount}Wei`);
    console.log(txLog);
  }

  return props.pageState === 'Board' ? (
    <Box
      sx={{
        display: 'flex',
        textAlign: 'center',
        border: '0.5px solid',
        margin: '0.8rem',
        borderRadius: '0.2em',
        height: '3rem',
        fontSize: '1.2rem',
        marginX: '1.2rem',
      }}
      onClick={() =>
        navigate(`/board/${props.id}`, {
          state: {
            id: props.id,
          },
        })
      }
    >
      <Box sx={{ width: '33%', pt: 1.3, textAlign: 'center' }}>{props.title}</Box>
      <Box sx={{ width: '33%', pt: 1.3, textAlign: 'center' }}>{props.artist}</Box>
      <Box sx={{ width: '33%', pt: 1.3, textAlign: 'center' }}>{props.genre}</Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        textAlign: 'center',
        border: '0.5px solid',
        margin: '0.8rem',
        borderRadius: '0.2em',
        height: '4rem',
        fontSize: '1rem',
        marginX: '1.2rem',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ width: '33%', pt: 1.5, textAlign: 'center' }}>{props.title}</Box>
      {type === 'General' ? <Box sx={{ width: '33%', pt: 1.5, textAlign: 'center' }}>{props.artist}</Box> : null}
      <Box sx={{ width: '33%', pt: 1.5, textAlign: 'center', fontSize: '1.2rem' }}>
        {type === 'Producer' ? (
          <>
            <Button color="secondary" onClick={async () => handleSettle()}>
              settle
            </Button>
            <Button
              color="secondary"
              onClick={() =>
                navigate(`/nft/sale/${props.id}`, {
                  state: {
                    id: props.id,
                  },
                })
              }
            >
              create nft
            </Button>
          </>
        ) : (
          <>
            <Button
              color="secondary"
              onClick={() =>
                window.open(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/purchase/${id}?token=${token}`, '_self')
              }
            >
              download
            </Button>
            <Button
              color="secondary"
              onClick={() =>
                navigate(`/nft/purchase/${props.id}`, {
                  state: {
                    id: props.id,
                  },
                })
              }
            >
              Buy nft
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
