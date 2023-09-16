import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SalamMelaka", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploySalamMelaka() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const SalamMelaka = await ethers.getContractFactory("SalamMelaka");
    const salamMelaka = await SalamMelaka.connect(owner).deploy("Rauf Yusoh");

    return { salamMelaka, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should return the correct Salam", async function () {
      const { salamMelaka, owner, otherAccount } = await loadFixture(
        deploySalamMelaka
      );

      expect(await salamMelaka.salam()).to.equal(
        "Assalamualaikum, Rauf Yusoh!"
      );
    });

    it("Should revert when non-owner attempt to change", async function () {
      const { salamMelaka, owner, otherAccount } = await loadFixture(
        deploySalamMelaka
      );

      await expect(salamMelaka.connect(otherAccount).changeName("Idris Jusoh"))
        .to.be.reverted;
    });
  });
});
