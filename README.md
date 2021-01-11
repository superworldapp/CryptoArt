# CryptoArt

## Errors when compiling original CryptoArt.sol in truffle

```bash
Error: Truffle is currently using solc >=0.4.24 <0.8.0, but one or more of your contracts specify "pragma solidity ^0.6.0"
```

```bash
Error: Could not find https://github.com/kole-swapnil/openzepkole/token/ERC721/ERC721.sol from any sources;
```

```bash
TypeError: "now" has been deprecated. Use "block.timestamp" instead.
```

```bash
CompileError: @openzeppelin/contracts/token/ERC721/ERC721.sol:136:5: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?
```

## Estimated gas cost for CryptoArt.sol in ganache-cli

```bash
   Deploying 'Cryptoart'
   ---------------------
   > transaction hash:    0xc0e956dd5164ac4974c0501f4d663ace44ebebd9b8c7741853355f3e0662c811
   > Blocks: 0            Seconds: 0
   > contract address:    0xCfEB869F69431e42cdB54A4F4f105C19C080A601
   > block number:        3
   > block timestamp:     1610047998
   > account:             0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1
   > balance:             999.99999999982120676
   > gas used:            8710364 (0x84e8dc)
   > gas price:           0.00000002 gwei
   > value sent:          0 ETH
   > total cost:          0.00000000017420728 ETH
   ```

## Truffle test results

```bash
  Contract: SuperWorld - CryptoArt
    Smart contract deployment
      ✓ has a name (79ms)
      ✓ has a percentageCut (93ms)
      ✓ has empty balance (84ms)
    Creation of art
      ✓ token id=1 is created under right ownership (758ms)
token.tokenSellPrice: 2000
      ✓ put for sale token id=1 (260ms)
Original Owner: 0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0
txSuccess: [object Object]
New Owner: 0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0
TokenSellPrice: 0
Token.toString[object Object]
      1) buyer purchase the object id=1

    Events emitted during test:
    ---------------------------

    Cryptoart.tokenbought(
      tokenId: <indexed> 1 (type: uint256),
      newowner: <indexed> 0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b (type: address),
      seller: <indexed> 0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0 (type: address),
      times: 1610051190 (type: uint256)
    )


    ---------------------------


  5 passing (3s)
  1 failing

  1) Contract: SuperWorld - CryptoArt
       Creation of art
         buyer purchase the object id=1:

      AssertionError: expected '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0' to equal '0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b'
      + expected - actual

      -0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0
      +0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b

      at Context.<anonymous> (test/CryptoArt.test.js:65:19)
      at processTicksAndRejections (node:internal/process/task_queues:93:5)

```
