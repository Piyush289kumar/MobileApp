import { useCourses } from "@/hooks/useCourses";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";

// 🧩 Gluestack UI
import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function CoursesScreen() {
  const { data, isLoading } = useCourses({
    page: 1,
    limit: 10,
  });

  const router = useRouter();

  if (isLoading)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
      </Box>
    );

  return (
    <Box flex={1} bg="$backgroundLight50" p="$4">
      <Heading size="xl" mb="$4">
        🎓 Explore Courses
      </Heading>

      <FlatList
        data={data?.data}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push(`/courses/course-details?id=${item._id}`)
            }
          >
            <Card
              size="md"
              variant="elevated"
              className="m-3"
            >
              <VStack space="sm">
                {/* Thumbnail */}
                <Image
                  source={{ uri: item.thumbnail }}
                  alt="course thumbnail"
                  style={{
                    width: "100%",
                    height: 150,
                    borderRadius: 12,
                  }}
                />

                {/* Title */}
                <Heading size="md" numberOfLines={2}>
                  {item.title}
                </Heading>

                {/* Description */}
                <Text size="sm" color="$textLight600" numberOfLines={2}>
                  {item.short_description || "No description"}
                </Text>

                <HStack>
                  {/* Level */}
                  <Badge action="primary" variant="solid" px="$2" py="$1">
                    <BadgeText>
                      {item.level ? item.level : "Beginner"}
                    </BadgeText>
                  </Badge>

                  {/* Price Display */}
                  <VStack alignItems="flex-end">
                    {item.sale_price ? (
                      <>
                        <Text
                          size="sm"
                          color="$red600"
                          fontWeight="bold"
                        >
                          ₹{item.sale_price}
                        </Text>
                        <Text
                          size="xs"
                          color="$textLight500"
                          textDecorationLine="line-through"
                        >
                          ₹{item.price}
                        </Text>
                      </>
                    ) : (
                      <Text
                        size="sm"
                        color="$textLight900"
                        fontWeight="bold"
                      >
                        ₹{item.price ?? "Free"}
                      </Text>
                    )}
                  </VStack>
                </HStack>
              </VStack>
            </Card>
          </Pressable>
        )}
      />
    </Box>
  );
}
