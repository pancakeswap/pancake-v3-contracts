# v3-lm-pool

Liquidity Mining Pool (LM Pool) is a separate contract for liquidity mining
reward accounting.
It is not meant to be deployed manually.
It will be deployed automatically by MasterChefV3 with LmPoolDeployer whenever
there is a new liquidity mining campaign.
As for testing, please check the tests in MasterChefV3 which is the main testing
entry point to test the correctness of the reward calculation.
