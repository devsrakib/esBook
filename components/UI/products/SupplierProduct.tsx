import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React, { memo, useMemo } from "react";
import { radius } from "@/constants/sizes";
import { Colors } from "@/constants/Colors";
import useApiHook from "@/hooks/all_api_hooks";
import { Fonts } from "@/constants/Fonts";

const SupplierProduct = ({ item }) => {
  console.log(item, "item:===========================");

  return (
    <View style={styles.container}>
      <View style={styles.imageAndNameCon}>
        <View style={styles.imageCon}>
          <Image style={styles.image} source={{ uri: item?.photo ? item?.photo : '../../../assets/images/defoulProduct.png' }} />
        </View>
        <View>
          <Text style={styles.productName}>{item?.product_name}</Text>
          <Text style={styles.priceText}>
            Buying Price: {item?.buying_price}
          </Text>
          <Text style={styles.priceText}>
            Buying Date: {new Date(item?.createdAt).toLocaleString()}
          </Text>
        </View>
      </View>
      <Text numberOfLines={5} style={styles.desc}>
        {item?.description} Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Natus sunt, architecto molestiae distinctio ex magni! Consequuntur
        est vitae, ratione aut ad similique minima quam expedita doloremque
        saepe debitis iure qui magni quas. Ex, odio delectus consequatur odit,
        fugiat inventore amet reiciendis provident quaerat quod eveniet quos
        praesentium distinctio natus labore libero vel expedita nulla impedit
        non. Ullam suscipit a magni, quia tenetur minima enim labore unde
        tempore perspiciatis voluptates odit quibusdam temporibus quae fuga? Cum
        porro itaque nesciunt reprehenderit ea! Velit totam saepe accusantium
        ducimus tempore necessitatibus repellendus, fuga assumenda quis ratione,
        deserunt numquam cumque iste optio quaerat excepturi dolor illo natus,
        eveniet a veniam quisquam explicabo. Culpa rerum, assumenda in commodi,
        cumque omnis, temporibus voluptas doloribus nemo nihil error ex maxime
        natus aspernatur ratione pariatur! Odit ipsam delectus, nobis optior
        vitae quos sint maxime deleniti vel, libero qui iure incidunt quod!
        Nobis pariatur perferendis aperiam voluptatem impedit esse mollitia
        nihil nemo eos, quos hic ipsum ab debitis iure explicabo, qui est
        tempore. Ipsum quaerat corporis quae totam voluptatibus porro excepturi,
        vel placeat minus laudantium molestiae tempora recusandae nobis possimus
        amet mollitia in maxime harum. Veniam laudantium autem voluptate, eius,
        veritatis, qui maiores et voluptates esse voluptas eligendi porro
        blanditiis.
      </Text>
    </View>
  );
};

export default memo(SupplierProduct);

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.medium,
    shadowColor: Colors.shadow,
    elevation: 10,
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  imageAndNameCon: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  imageCon: {
    width: 80,
    height: 80,
    backgroundColor: Colors.VeroneseGreen,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: radius.small
  },
  productName: {
    fontSize: Fonts.large,
    fontWeight: "600",
    color: Colors.mainColor,
    marginBottom: 5,
  },
  priceText: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  desc: {
    fontSize: Fonts.small,
    color: Colors.text,
  },
});
