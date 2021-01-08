const { assert } = require('chai')

const Cryptoart = artifacts.require('Cryptoart')

require('chai')
.use(require('chai-as-promised'))
.should()

var percentageCut = 10;
var metaurl = 'http://geo.swapnil.art/'

contract ('SuperWorld - CryptoArt', ([owner, artist, buyer]) => {
    let _cryptoart
    before ( async () => {
        _cryptoart = await Cryptoart.new(percentageCut,metaurl)        
    })

    describe ("Smart contract deployment", async () => {
        it('has a name', async () => {
            const name = await _cryptoart.name()
            assert.equal(name, 'SuperArt')
        })
        it ('has a percentageCut', async() => {
            const cut = await _cryptoart.percentageCut()
            assert.equal(cut, percentageCut)
        })
        it ('has empty balance', async () => {
            const bal = await _cryptoart.totalbal()
            assert.equal(bal, 0)
        })
    })

    describe ("Creation of art", async () => {
        it ('token id=1 is created under right ownership', async () => {

            //console.log("address(artist):" + artist)
            const newToken = await _cryptoart.create(1234, 'token1', 1000, '/', 1 , {from : artist})
            //console.log("newToken:" + newToken)
            const origOwner = await _cryptoart.ownerOf('1')
            //console.log("address(origOwner):" + origOwner)
            assert.equal(origOwner, artist, "token creator address matches ownership when calling function ownerOf()")
            //const tokenStruct = await _cryptoart.getInfo('1')
            //console.log("TokenPrice: " + tokenStruct.tokenPrice)
            //console.log("TokenSellPrice: " + tokenStruct.tokenSellPrice)

        })
        it ('put for sale token id=1', async () => {
            await _cryptoart.putForSale(1, 2000 , {from : artist})
            token = await _cryptoart.Arts(1)
            assert.equal(token.tokenSellPrice, 2000)
            console.log("token.tokenSellPrice: " + token.tokenSellPrice)

         })

        it ('buyer purchase the object id=1', async () => {
           origOwner1 = await _cryptoart.ownerOf('1')
           console.log("Original Owner: " + origOwner1)
           txSuccess =  await _cryptoart.buyToken(1, {value: 2000 , from : buyer})
           console.log("txSuccess: " + txSuccess.toString())
           newOwner1 = await _cryptoart.ownerOf('1')
           console.log("New Owner: " + newOwner1)
           token = await _cryptoart.Arts(1)
           console.log("TokenSellPrice: " + token.tokenSellPrice)
           console.log("Token.toString" + token.toString())
           assert.equal(newOwner1, buyer)

        })

    })
})