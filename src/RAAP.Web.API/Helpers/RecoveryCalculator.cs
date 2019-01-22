using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Ajax.Utilities;
using Microsoft.Win32;
using Asset = RAAP.Database.Asset;

namespace RAAP.Web.API.Helpers
{
    public static class RecoveryCalculator
    {
        public static void CalculateRecovery(Asset asset)
        {
            asset.Children.Select(a => a.Child).ForEach(CalculateRecovery);
                asset.CalculatedDataRecoveryCost = asset.DataRecoveryCost + asset.Children.Where(
                    a => a.RecoveryCalculateType == (int) Contracts.Asset.RecoveryCalculateType.Serial)
                    .Sum(a => a.Child.CalculatedDataRecoveryCost);
                asset.CalculatedDataRecoveryTime = asset.DataRecoveryTime  + asset.Children.Where(
                    a => a.RecoveryCalculateType == (int) Contracts.Asset.RecoveryCalculateType.Serial)
                    .Sum(a => a.Child.CalculatedDataRecoveryTime);
                asset.CalculatedSystemRecoveryCost = asset.SystemRecoveryCost + asset.Children.Where(
                    a => a.RecoveryCalculateType == (int) Contracts.Asset.RecoveryCalculateType.Serial)
                    .Sum(a => a.Child.CalculatedSystemRecoveryCost);
                asset.CalculatedSystemRecoveryTime = asset.SystemRecoveryTime + asset.Children.Where(
                    a => a.RecoveryCalculateType == (int) Contracts.Asset.RecoveryCalculateType.Serial)
                    .Sum(a => a.Child.CalculatedSystemRecoveryTime);
                asset.CalculatedIntegrityCheckCost = asset.IntegrityCheckCost + asset.Children.Where(
                    a => a.RecoveryCalculateType == (int) Contracts.Asset.RecoveryCalculateType.Serial)
                    .Sum(a => a.Child.CalculatedIntegrityCheckCost);
                asset.CalculatedIntegrityCheckTime = asset.IntegrityCheckTime + asset.Children.Where(
                    a => a.RecoveryCalculateType == (int) Contracts.Asset.RecoveryCalculateType.Serial)
                    .Sum(a => a.Child.CalculatedIntegrityCheckTime);
            foreach (var subAsset in asset.Children.Where(
                    a => a.RecoveryCalculateType == (int)Contracts.Asset.RecoveryCalculateType.Parallel).Select(a => a.Child))
            {
                if (asset.CalculatedDataRecoveryCost < subAsset.CalculatedDataRecoveryCost)
                    asset.CalculatedDataRecoveryCost = subAsset.CalculatedDataRecoveryCost;
                if (asset.CalculatedDataRecoveryTime < subAsset.CalculatedDataRecoveryTime)
                    asset.CalculatedDataRecoveryTime = subAsset.CalculatedDataRecoveryTime;

                if (asset.CalculatedSystemRecoveryCost < subAsset.CalculatedSystemRecoveryCost)
                    asset.CalculatedSystemRecoveryCost = subAsset.CalculatedSystemRecoveryCost;
                if (asset.CalculatedSystemRecoveryTime < subAsset.CalculatedSystemRecoveryTime)
                    asset.CalculatedSystemRecoveryTime = subAsset.CalculatedSystemRecoveryTime;

                if (asset.CalculatedIntegrityCheckCost < subAsset.CalculatedIntegrityCheckCost)
                    asset.CalculatedIntegrityCheckCost = subAsset.CalculatedIntegrityCheckCost;
                if (asset.CalculatedIntegrityCheckTime < subAsset.CalculatedIntegrityCheckTime)
                    asset.CalculatedIntegrityCheckTime = subAsset.CalculatedIntegrityCheckTime;
            }
        }
    }
}